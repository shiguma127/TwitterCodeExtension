const reg = new RegExp(/`{3}(.|\n)*`{3}/)
hljs.highlightAll()
function change() {
    let elements = document.getElementsByClassName('js-tweet-text tweet-text with-linebreaks');
    for (element of elements) {
        console.log(element)
    }
}

marked.setOptions({
    highlight: function (code, lang) {
        return hljs.highlightAuto(code, [lang]).value
    }
});

const observer = new MutationObserver(() => {
    console.log("変わったよ")
    let elements = document.getElementsByTagName('p')
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