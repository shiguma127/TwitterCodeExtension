hljs.highlightAll();

const filenames = [1, 2];
chrome.runtime.getPackageDirectoryEntry(function (directoryEntry) {
    directoryEntry.getDirectory('highlight', {}, function (highlightDir) {
        highlightDir.getDirectory('styles', {}, function (stylesDir) {
            const directoryReader = stylesDir.createReader();
            directoryReader.readEntries(function (entries) {
                for (entry of entries) {
                    if (entry.name.match(/.*.css$/))
                        filenames.push(entry.name);
                }
            })
        })
    });
})

setTimeout(function () {
    console.log(filenames)
    for (file of filenames) {
        console.log(file)
    }
}, 100)

const selector = document.getElementById('selector');
for (filename of filenames) {
    var option = document.createElement("option");
    option.text = filename;
    option.value = filename;
    selector.appendChild(option);
}
//reference https://stackoverflow.com/questions/43008952/how-to-access-a-specific-folder-to-get-file-names-within-my-extension