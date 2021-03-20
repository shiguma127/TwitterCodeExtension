const reg = new RegExp(/`{3}(.|\n)*`{3}/)
hljs.highlightAll()

marked.setOptions({
    highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value
    }
});

const observer = new MutationObserver(() => {
    let elements = document.getElementsByClassName('r-bcqeeo')
    for (element of elements) {
        const text = element.textContent
        if (text.match(reg) !== null) {
            console.log(marked(text).replaceAll('<pre>', '<pre class="hljs"'))
            element.innerHTML = marked(text).replaceAll('<pre>', '<pre class="hljs"')
        }
    }
    hljs.highlightAll()
})

setTimeout(() => {
    hljs.highlightAll()
}, 5000)

observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
})