export function getFileExtension(filename) {
    const ext = /^.+\.([^.]+)$/.exec(filename)

    return ext ? ext[1] : ''
}
