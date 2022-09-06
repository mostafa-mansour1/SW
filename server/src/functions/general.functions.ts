export const log =
{
    info: (...message: unknown[]) => console.info(...message),
    err: (...message: unknown[]) => console.error(...message),
    log: (...message: unknown[]) => console.log(...message),
    wrn: (...message: unknown[]) => console.warn(...message),
    grid: (...message: unknown[]) => console.table(...message)
}