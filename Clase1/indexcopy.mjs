import { readFile } from 'node:fs/promises'

const text = await readFile('./archivo.txt', 'utf-8')

console.log('Primer texto:', text)

const text2 = await readFile('./archivo2.txt', 'utf-8')

console.log(text2)

console.log('Haciendo otros procesos mientras se leen los archivos')
