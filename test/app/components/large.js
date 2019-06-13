import React from 'react'

import { List, Typography } from 'untd'

let key = 0

export default class extends React.Component {
    
    state = { dataSource: [] }

    gItem(count = 100) {
        const state = []
        for(let i = 0; i < count; i++) {
            state.push({ key: key++ })
        }
        return state
    }

    componentDidMount() {
        const interId = setInterval(() => {
            const { dataSource } = this.state
            console.log('key', key)
            this.setState({
                dataSource: [...dataSource, ...this.gItem(1000) ]
            })
            if (key > 10000) {
                clearInterval(interId)
            }
        }, 800)
    }
    
    render() {
        const { dataSource } = this.state
        return <List
            dataSource={dataSource}
            renderItem={item => {
                return <List.Item key={item.key}>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item.key}
                </List.Item>
            }}
        />
    }
}

