export class Tar {

    static create(dir:string) {
        const args = ['coz', '-C', dir, '.']
        console.log({ args })
        const cmdOut = new Deno.Command('tar', { args, stdout: 'piped' }).outputSync()
        return cmdOut.stdout
    }

    static async extract(archive:Uint8Array, dir:string) {
        const args = ['xCfz', dir, '-']
        const proc = new Deno.Command('tar', { args, stdin: 'piped', stdout: 'piped' }).spawn()
        const writer = proc.stdin.getWriter()
        await writer.write(archive)
        await writer.close()
        await proc.output()
    }

}