import { fromFileUrl } from 'https://deno.land/std@0.224.0/path/from_file_url.ts'
import { Tar } from "../../Tar.ts"

const dir = fromFileUrl(import.meta.resolve('./'))
console.log(dir)
const foo = Tar.create(dir)
console.log(foo)

// this part isn't necessary for the test
Deno.writeFileSync(`${dir}/foo.tar.gz`, foo)