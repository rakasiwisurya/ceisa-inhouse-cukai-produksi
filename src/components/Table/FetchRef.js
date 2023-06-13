import { Icon, Tooltip } from 'antd'
import { get, isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import useFetchApi from 'utils/api/useFetchApi'

function FetchRef({url='', onGet=() => {}, field='data.data', title=''}) {
    const [res, fetch] = useFetchApi()

    useEffect(getApi, [])
    function getApi() {
        fetch(url, {persist: true})    
        const temp = get(res.data, `${field}`, [])
        if(!isEmpty(temp))
            onGet(temp)
    }

    useEffect(apiHandler, [res.data])
    function apiHandler() {
        const temp = get(res.data, `${field}`, [])
        if(!isEmpty(temp))
            onGet(temp)
    }

    
    return (
        <>
            {
                res.error ? 
                <Tooltip title='Muat Ulang'>
                    {title} <Icon style={{color: 'red'}} onClick={() => getApi()} type='warning'/>
                </Tooltip>
                :
                res.loading ? 
                <> {title} <Icon style={{color: '#1890FF'}} type='loading'/> </>
                :
                title
            }  
        </>
    )
}

export default FetchRef
