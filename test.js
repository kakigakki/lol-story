function calc() {
    let str = "GFB305,GFB314,GFF030,GKA001,GHA002,GHA003,GHA004,GHA005,GHA006,GHA007,GHA008,GHA009,GHA010,GHA011,GJI009,GBO001,GBO002,GBO003,GBO004,GBO007,GBO009,GBO010,GBO014,GBO017,GBO018,GTB001,GLI006,GTA004,GFF008,GFF062,GMA001,GMA008,GZS001,GZS002,GZS003,GFF011,GFI302,GMM007,GBO013,GBO016,GFF005,GFF006,GFF017,GSO001"
    let str2 = str.split(",").map(x => {
        return `'${x}'`
    }).join(",")
    return `(${str2})`
}

console.log(calc());