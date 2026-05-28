'use client'

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export interface PdfExportOptions {
  filename?: string
  title?: string
  author?: string
}

export async function exportReportToPdf(
  elementId: string,
  options: PdfExportOptions = {}
): Promise<void> {
  const {
    filename = '学术社交模拟器-诊断报告.pdf',
    title = '学术社交模拟器 诊断报告',
    author = '学术社交模拟器',
  } = options

  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('报告元素未找到')
  }

  // 显示导出提示
  const loadingToast = document.createElement('div')
  loadingToast.className = 'fixed top-4 right-4 bg-surface-light border border-surface-lighter rounded-lg p-3 shadow-lg z-50 text-sm text-text-secondary'
  loadingToast.innerHTML = '📄 正在生成 PDF...'
  document.body.appendChild(loadingToast)

  try {
    // 等待字体和图片加载
    await new Promise(resolve => setTimeout(resolve, 500))

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#1a1a2e',
      logging: false,
      allowTaint: true,
      onclone: (clonedDoc) => {
        // 在克隆的文档中调整样式
        const clonedElement = clonedDoc.getElementById(elementId)
        if (clonedElement) {
          clonedElement.style.padding = '20px'
        }
      },
    })

    const imgData = canvas.toDataURL('image/png', 1.0)
    
    // A4 尺寸 (mm)
    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // 设置元数据
    pdf.setProperties({
      title,
      author,
      creator: '学术社交模拟器',
    })

    // 添加标题页
    pdf.setFontSize(24)
    pdf.setTextColor(26, 26, 46) // 深色背景
    pdf.rect(0, 0, imgWidth, pageHeight, 'F')
    
    // 添加内容
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // 如果内容超过一页，添加更多页面
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      
      // 添加背景
      pdf.setFillColor(26, 26, 46)
      pdf.rect(0, 0, imgWidth, pageHeight, 'F')
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // 保存 PDF
    pdf.save(filename)

    // 更新提示
    loadingToast.innerHTML = '✅ PDF 已下载'
    setTimeout(() => {
      loadingToast.remove()
    }, 2000)

  } catch (error) {
    console.error('PDF 导出失败:', error)
    loadingToast.innerHTML = '❌ 导出失败，请重试'
    loadingToast.className = 'fixed top-4 right-4 bg-red-950 border border-red-800 rounded-lg p-3 shadow-lg z-50 text-sm text-red-400'
    setTimeout(() => {
      loadingToast.remove()
    }, 3000)
    throw error
  }
}

// 导出为图片
export async function exportReportToImage(
  elementId: string,
  filename: string = '学术社交模拟器-诊断报告.png'
): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error('报告元素未找到')
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#1a1a2e',
    logging: false,
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
