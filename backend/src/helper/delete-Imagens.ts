import path from 'path'
import fs from 'fs'

export function deleteImagens(imagens: string[] | string) {

    if(Array.isArray(imagens)) {

        for(const flles of imagens) {
            fs.unlink(path.resolve(__dirname, "../", flles), () => console.log('deleted'))
        }

    } else {
        fs.unlink(path.resolve(__dirname, "../", imagens), () => console.log('deleted'))
    }

}