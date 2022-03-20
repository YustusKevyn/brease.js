import fs from "fs/promises";
import path from "path";
import glob from "glob";
import typescript from "typescript";

(async () => {
  let files = await match("src/**/*.ts"),
  base: typescript.CompilerOptions = {
    strict: true,
    declaration: true,
    esModuleInterop: true,
    exactOptionalPropertyTypes: true
  };

  // ESM 
  await compile("dist/lib/esm", files, {
    ...base,
    module: typescript.ModuleKind.ES2015,
    target: typescript.ScriptTarget.ES2015
  });

  // CJS 
  await compile("dist/lib/cjs", files, {
    ...base,
    moduleResolution: typescript.ModuleResolutionKind.Node12
  });
})();

async function exists(path: string){
  try{
    await fs.stat(path);
  }
  catch{
    await fs.mkdir(path, {recursive: true});
  }
};

async function match(pattern: string){
  return await new Promise<string[]>(res => {
    glob(pattern, (error, matches) => res(matches));
  });
};

async function compile(dir: string, files: string[], options: typescript.CompilerOptions){
  let out: Record<string, string> = {},
  host = typescript.createCompilerHost(options);
  host.writeFile = (name: string, content: string) => {
    name = path.relative("src", name);
    out[name] = content;
  };
  
  // Compile 
  let program = typescript.createProgram(files, options, host),
  result = program.emit();

  // Diagnostics 
  let diagnostics = typescript.getPreEmitDiagnostics(program).concat(result.diagnostics);
  if(diagnostics.length){
    for(let entry of diagnostics){
      if(entry.file){
        let {line, character} = typescript.getLineAndCharacterOfPosition(entry.file, entry.start!),
        message = typescript.flattenDiagnosticMessageText(entry.messageText, "\n");
        console.warn(`${entry.file.fileName} (${line + 1},${character + 1}): ${message}`);
      }
      else{
        console.warn(typescript.flattenDiagnosticMessageText(entry.messageText, "\n"));
      }
    }
  }

  // Files 
  for(let file in out){
    let final = path.join(dir, file);
    await exists(path.dirname(final));
    await fs.writeFile(final, out[file], "utf-8");
  }
};