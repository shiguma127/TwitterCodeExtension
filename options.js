hljs.highlightAll();
chrome.runtime.getPackageDirectoryEntry(function (directoryEntry) {
    directoryEntry.getDirectory('highlight/styles', {}, function (stylesDir) {
        console.log(stylesDir)
        const directoryReader = stylesDir.createReader();
        const filenames = [];
        (function readNext() {
            directoryReader.readEntries(function (entries) {
                if (entries.length) {
                    for (const entry of entries) {
                        if (entry.name.match(/.*.css$/))
                            filenames.push(entry.name);
                    }
                    readNext();
                } else {
                    const selector = document.getElementById('selector');
                    for (filename of filenames) {
                        var option = document.createElement("option");
                        option.text = filename;
                        option.value = filename;
                        selector.appendChild(option);
                    }
                    chrome.storage.sync.get({ style: 'a11y - dark.css' }, function (value) {
                        console.log(value);
                        const index = Array.from(selector.options).findIndex((option) => option.value === value.style);
                        selector.options[index].selected = true
                        changeStyle(value.style)
                    })
                }
            });
        })();
    })
})
//reference https://stackoverflow.com/questions/43008952/how-to-access-a-specific-folder-to-get-file-names-within-my-extension



const linkstyle = document.getElementById('style');
const saveBtn = document.getElementById('save');
const selecter = document.getElementById('selector');

function changeStyle(style) {
    linkstyle.href = 'highlight/styles/' + style;
}

selecter.addEventListener('change', () => {
    const selected = document.getElementById('selector').value;
    changeStyle(selected)
})

saveBtn.addEventListener('click', () => {
    const style = document.getElementById('selector').value
    chrome.storage.sync.set({ style: style }, () => {
        alert('saved style')
    })
});


