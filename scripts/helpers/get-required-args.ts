export function getRequiredArgs(name: string): string {
  const args = process.argv
  const infoIdx = args.indexOf('--' + name)
  if (infoIdx === -1) throw new Error('Must specify --' + name)
  return args[infoIdx + 1]
}
