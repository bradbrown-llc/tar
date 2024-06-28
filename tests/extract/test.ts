import { fromFileUrl } from 'https://deno.land/std@0.224.0/path/from_file_url.ts'
import { Tar } from "../../Tar.ts";

const archive = Deno.readFileSync('foo.tar.gz')
const dir = fromFileUrl(import.meta.resolve('./result/'))
await Tar.extract(archive, dir)