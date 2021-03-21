const reg = new RegExp(/`{3}(.|\n)*`{3}/)
marked.setOptions({
    highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value
    }
});
chrome.storage.sync.get({ style: 'a11y-dark.css' }, function (value) {
    const styleElement = document.createElement('link')
    styleElement.rel = "stylesheet"
    const styleURL = chrome.extension.getURL('highlight/styles/' + value.style)
    styleElement.setAttribute('href', styleURL)
    styleElement.setAttribute("id", 'code-style')
    const head = document.getElementsByTagName('head')
    head[0].appendChild(styleElement)
})

const observer = new MutationObserver(() => {
    let elements = document.getElementsByClassName('tweet-text')
    for (element of elements) {
        const text = element.textContent
        if (text.match(reg) !== null) {
            console.log(marked(text).replaceAll('<pre>', '<pre class="hljs"'))
            element.innerHTML = marked(text).replaceAll('<pre>', '<pre class="hljs"')
        }
    }
    hljs.highlightAll()
})

observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
})