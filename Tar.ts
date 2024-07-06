import { encodeBase64, decodeBase64 } from 'https://deno.land/std@0.224.0/encoding/base64.ts';

export class Tar {

    static create(dir:string) {
        const args = ['coz', '-C', dir, '.']
        console.log({ args })
        const cmdOut = new Deno.Command('tar', { args, stdout: 'piped' }).outputSync()
        return cmdOut.stdout
    }

    static create64(dir:string) { return encodeBase64(Tar.create(dir)) }

    static async extract(archive:Uint8Array, dir:string) {
        const args = ['xCfz', dir, '-']
        const proc = new Deno.Command('tar', { args, stdin: 'piped', stdout: 'piped' }).spawn()
        const writer = proc.stdin.getWriter()
        await writer.write(archive)
        await writer.close()
        await proc.output()
    }

    static async extract64(archive:string, dir:string) {
        return await Tar.extract(decodeBase64(archive), dir)
    }

}