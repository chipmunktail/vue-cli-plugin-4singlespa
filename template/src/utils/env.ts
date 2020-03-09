type Tenv = () => string
type TApiserve = () => string
const env: Tenv = () => {
    // production
    // development
    return process.env.NODE_ENV
}

const getUrl = (dev: string, prod: string, def: string = '') => {
    const envs: string = env()
    return envs === 'development' ? dev : envs === 'production' ? prod : def
}


const apiServe: TApiserve = () => {
    const devUrl = '{devURL}'
    const proUrl = '{proURL}'
    return getUrl(devUrl, proUrl)
}

export {
    env,
    apiServe,
}
