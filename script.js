/**
 * ============================================
 * 古风个人网站 - JavaScript 交互脚本
 * ============================================
 * 功能: 动画控制、微信弹窗、备案年份自动更新
 */

'use strict';

/* ============================================
   1. DOM 元素引用
   ============================================ */
const elements = {
    // 谚语文字元素
    quoteText: document.getElementById('quote-text'),

    // 微信公众号相关
    wechatLink: document.getElementById('wechat-link'),
    wechatModal: document.getElementById('wechat-modal'),
    wechatModalClose: document.getElementById('wechat-modal-close'),

    // 年份显示
    currentYear: document.getElementById('current-year'),

    // 导航链接
    navLinks: document.querySelectorAll('.nav-link')
};

/* ============================================
   2. 谚语打字机效果
   ============================================ */

/**
 * 谚语打字机动画效果
 * 模拟逐字显示的效果，增强古风韵味
 */
function initTypewriterEffect() {
    const text = elements.quoteText.textContent;
    elements.quoteText.textContent = '';
    elements.quoteText.style.opacity = '1';

    let index = 0;
    const speed = 100; // 每个字符显示间隔（毫秒）

    function typeChar() {
        if (index < text.length) {
            elements.quoteText.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, speed);
        }
    }

    // 延迟启动，等页面动画完成
    setTimeout(typeChar, 1500);
}

/* ============================================
   3. 微信公众号弹窗控制
   ============================================ */

/**
 * 打开微信公众号弹窗
 */
function openWechatModal() {
    if (elements.wechatModal) {
        elements.wechatModal.hidden = false;
        document.body.style.overflow = 'hidden'; // 防止背景滚动

        // 聚焦到关闭按钮，改善无障碍
        elements.wechatModalClose.focus();
    }
}

/**
 * 关闭微信公众号弹窗
 */
function closeWechatModal() {
    if (elements.wechatModal) {
        elements.wechatModal.hidden = true;
        document.body.style.overflow = ''; // 恢复背景滚动

        // 返回焦点到触发元素
        if (elements.wechatLink) {
            elements.wechatLink.focus();
        }
    }
}

/**
 * 初始化微信弹窗事件监听
 */
function initWechatModal() {
    // 点击微信链接打开弹窗
    if (elements.wechatLink) {
        elements.wechatLink.addEventListener('click', (e) => {
            e.preventDefault();
            openWechatModal();
        });
    }

    // 点击关闭按钮关闭弹窗
    if (elements.wechatModalClose) {
        elements.wechatModalClose.addEventListener('click', closeWechatModal);
    }

    // 点击弹窗背景关闭
    if (elements.wechatModal) {
        elements.wechatModal.addEventListener('click', (e) => {
            if (e.target === elements.wechatModal) {
                closeWechatModal();
            }
        });
    }

    // ESC 键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.wechatModal && !elements.wechatModal.hidden) {
            closeWechatModal();
        }
    });
}

/* ============================================
   4. 备案年份自动更新
   ============================================ */

/**
 * 更新页脚版权年份为当前年份
 */
function updateCopyrightYear() {
    if (elements.currentYear) {
        const year = new Date().getFullYear();
        elements.currentYear.textContent = year;
    }
}

/* ============================================
   5. 链接点击涟漪效果
   ============================================ */

/**
 * 为导航链接添加涟漪点击效果
 * 增强交互反馈感
 */
function initRippleEffect() {
    elements.navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 创建涟漪元素
            const ripple = document.createElement('span');
            ripple.className = 'ripple';

            // 获取点击位置
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            // 添加涟漪类
            ripple.classList.add('active');

            // 移除旧涟漪，添加新涟漪
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            this.appendChild(ripple);

            // 动画结束后移除
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });
}

/* ============================================
   6. 滚动显示动画 (Intersection Observer)
   ============================================ */

/**
 * 使用 Intersection Observer 实现滚动时元素渐入
 * 优化性能，避免使用 scroll 事件
 */
function initScrollAnimations() {
    // 检测浏览器是否支持 Intersection Observer
    if (!('IntersectionObserver' in window)) {
        return;
    }

    const observerOptions = {
        root: null, // 使用视口作为根
        rootMargin: '0px',
        threshold: 0.1 // 元素 10% 可见时触发
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 动画只执行一次
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.quote-section, .nav-links');
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

/* ============================================
   7. 页面加载完成初始化
   ============================================ */

/**
 * DOM 加载完成后初始化所有功能
 */
function init() {
    // 更新版权年份
    updateCopyrightYear();

    // 初始化微信弹窗
    initWechatModal();

    // 初始化涟漪效果
    initRippleEffect();

    // 初始化滚动动画
    initScrollAnimations();

    // 打字机效果在页面加载动画之后执行
    // 注意：由于 CSS 动画已处理淡入，JS 打字机作为增强效果
    // 如果不需要可注释掉下面这行
    // initTypewriterEffect();

    console.log('墨韵阁 - 页面加载完成');
}

// 确保 DOM 完全加载后再执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM 已加载，直接执行
    init();
}

/* ============================================
   8. 添加涟漪效果的 CSS (动态注入)
   ============================================ */

// 动态添加涟漪样式到页面
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .nav-link {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(199, 75, 75, 0.3);
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* 滚动动画类 */
    .scroll-animate {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .scroll-animate.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(rippleStyles);

/* ============================================
   9. 导出公共 API (供外部扩展使用)
   ============================================ */

// 将关键函数暴露到全局，允许后续扩展
window.AncientPortfolio = {
    openWechatModal,
    closeWechatModal,
    updateCopyrightYear
};
