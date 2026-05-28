-- =====================================================
-- 学术社交模拟器 - 数据库初始化
-- Supabase PostgreSQL
-- =====================================================

-- 1. 用户配置表（扩展 auth.users）
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  display_name TEXT,
  email TEXT,
  avatar_url TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'paid', 'pro')),
  pro_expires_at TIMESTAMPTZ,
  monthly_plays_used INT NOT NULL DEFAULT 0,
  monthly_plays_reset_at TIMESTAMPTZ DEFAULT (date_trunc('month', NOW()) + INTERVAL '1 month'),
  total_sessions INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. 角色自定义名表
CREATE TABLE IF NOT EXISTS custom_names (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  character_id TEXT NOT NULL,
  custom_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, character_id)
);

-- 3. 游戏会话记录表
CREATE TABLE IF NOT EXISTS play_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  scenario_id TEXT NOT NULL,
  role_id TEXT,
  perspective TEXT DEFAULT 'student',
  stage TEXT,
  player_state JSONB,
  scenario_result JSONB,
  ending_id TEXT,
  ending_score INT,
  report_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INT
);

-- 4. 游戏事件日志表
CREATE TABLE IF NOT EXISTS game_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES play_sessions(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  thread_id TEXT,
  choice_id TEXT,
  energy_before INT,
  energy_after INT,
  consistency_before INT,
  consistency_after INT,
  mine_id TEXT,
  info_id TEXT,
  event_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. 支付订单表
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('alipay', 'wechat')),
  product_type TEXT NOT NULL CHECK (product_type IN ('single_report', 'pro_monthly', 'pro_yearly')),
  amount_cents INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'expired')),
  channel_trade_no TEXT,
  session_id UUID REFERENCES play_sessions(id),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. 订阅表
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('pro_monthly', 'pro_yearly')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. 诊断报告表
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  session_id UUID NOT NULL REFERENCES play_sessions(id) ON DELETE CASCADE,
  dimensions JSONB,
  events JSONB,
  behind_evaluations JSONB,
  personality_tag TEXT,
  improvement_suggestions JSONB,
  comparison_data JSONB,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. 成就系统表
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  achievement_id TEXT NOT NULL,
  session_id UUID REFERENCES play_sessions(id),
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- =====================================================
-- 索引
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_play_sessions_user ON play_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_play_sessions_scenario ON play_sessions(scenario_id);
CREATE INDEX IF NOT EXISTS idx_game_events_session ON game_events(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_no ON orders(order_no);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_session ON reports(session_id);

-- =====================================================
-- RLS 策略
-- =====================================================
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_names ENABLE ROW LEVEL SECURITY;
ALTER TABLE play_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的数据
CREATE POLICY "users_own_profile" ON user_profiles
  FOR ALL USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "users_own_custom_names" ON custom_names
  FOR ALL USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "users_own_sessions" ON play_sessions
  FOR ALL USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "users_own_events" ON game_events
  FOR ALL USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "users_own_orders" ON orders
  FOR ALL USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "users_own_subscriptions" ON subscriptions
  FOR ALL USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "users_own_reports" ON reports
  FOR ALL USING (user_id = current_setting('app.current_user_id', true));

CREATE POLICY "users_own_achievements" ON user_achievements
  FOR ALL USING (user_id = current_setting('app.current_user_id', true));

-- 服务角色可全访问（用于 webhook/cron）
CREATE POLICY "service_full_access_profiles" ON user_profiles
  FOR ALL USING (current_setting('role') = 'service_role');

CREATE POLICY "service_full_access_orders" ON orders
  FOR ALL USING (current_setting('role') = 'service_role');

CREATE POLICY "service_full_access_subscriptions" ON subscriptions
  FOR ALL USING (current_setting('role') = 'service_role');

CREATE POLICY "service_full_access_sessions" ON play_sessions
  FOR ALL USING (current_setting('role') = 'service_role');

-- =====================================================
-- 触发器函数
-- =====================================================

-- 自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_profiles_updated
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_orders_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_subscriptions_updated
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- session完成时自动更新 total_sessions
CREATE OR REPLACE FUNCTION increment_total_sessions()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.ended_at IS NOT NULL AND OLD.ended_at IS NULL THEN
    UPDATE user_profiles
    SET total_sessions = total_sessions + 1
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_session_completed
  AFTER UPDATE ON play_sessions
  FOR EACH ROW EXECUTE FUNCTION increment_total_sessions();

-- =====================================================
-- 工具函数
-- =====================================================

-- 重置月度使用次数
CREATE OR REPLACE FUNCTION reset_monthly_plays()
RETURNS void AS $$
BEGIN
  UPDATE user_profiles
  SET monthly_plays_used = 0,
      monthly_plays_reset_at = date_trunc('month', NOW()) + INTERVAL '1 month'
  WHERE monthly_plays_reset_at <= NOW();
END;
$$ LANGUAGE plpgsql;

-- 过期订阅处理
CREATE OR REPLACE FUNCTION expire_subscriptions()
RETURNS void AS $$
BEGIN
  -- 标记过期订阅
  UPDATE subscriptions
  SET status = 'expired'
  WHERE status = 'active'
    AND current_period_end < NOW();

  -- 降级用户
  UPDATE user_profiles
  SET subscription_tier = 'free',
      pro_expires_at = NULL
  WHERE subscription_tier = 'pro'
    AND pro_expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- 检查用户是否为Pro
CREATE OR REPLACE FUNCTION is_pro(p_user_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_id = p_user_id
      AND subscription_tier = 'pro'
      AND (pro_expires_at IS NULL OR pro_expires_at > NOW())
  );
END;
$$ LANGUAGE plpgsql;
