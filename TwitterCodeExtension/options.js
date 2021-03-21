hljs.highlightAll();

chrome.runtime.getPackageDirectoryEntry(function (directoryEntry) {
    directoryEntry.getDirectory('highlight/styles', {}, function (stylesDir) {
        const directoryReader = stylesDir.createReader();
        const filenames = [];
        (function readNext() {
            directoryReader.readEntries(function(entries) {
                if (entries.length) {
                    for (const entry of entries) {
                        if (entry.name.match(/.*.css$/))
                            filenames.push(entry.name);
                    }
                    readNext();
                } else {
                    for (file of filenames) {
                        console.log(file)
                    }

                    const selector = document.getElementById('selector');
                    for (filename of filenames) {
                        var option = document.createElement("option");
                        option.text = filename;
                        option.value = filename;
                        selector.appendChild(option);
                    }
                }
            });
        })();
    })
})
//reference https://stackoverflow.com/questions/43008952/how-to-access-a-specific-folder-to-get-file-names-within-my-extension
