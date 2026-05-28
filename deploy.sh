#!/bin/bash
set -e

echo "=== 学术社交模拟器 - 阿里云部署脚本 ==="
echo ""

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo "安装 Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "安装 Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# 检查 .env.local
if [ ! -f .env.local ]; then
    echo ""
    echo "错误: 缺少 .env.local 文件"
    echo "请先复制 .env.local.example 并填写配置:"
    echo "  cp .env.local.example .env.local"
    echo "  vim .env.local"
    exit 1
fi

echo ""
echo "1. 构建 Docker 镜像..."
docker compose build

echo ""
echo "2. 启动服务..."
docker compose up -d

echo ""
echo "3. 检查服务状态..."
sleep 3
docker compose ps

echo ""
echo "=== 部署完成 ==="
echo ""
echo "访问地址: http://$(curl -s ifconfig.me 2>/dev/null || echo 'your-server-ip'):80"
echo ""
echo "后续步骤:"
echo "  1. 绑定域名: 修改 nginx.conf 中的 server_name"
echo "  2. 配置 SSL: 将证书放入 ssl/ 目录，取消 nginx.conf 中 HTTPS 注释"
echo "  3. 配置支付: 在 .env.local 中填写支付宝/微信商户信息"
echo "  4. 重启服务: docker compose restart"
echo ""
echo "常用命令:"
echo "  查看日志: docker compose logs -f app"
echo "  重启服务: docker compose restart"
echo "  停止服务: docker compose down"
