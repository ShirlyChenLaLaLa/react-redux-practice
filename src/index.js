import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './Header'
import Content from './Content'
import PropTypes from 'prop-types'

function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch({})
    return { getState, dispatch, subscribe }
}

const themeReducer = (state, action) => {
    if (!state) return {
        themeColor: 'red'
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, themeColor: action.themeColor }
        default:
            return state
    }
}

const store = createStore(themeReducer)

class Index extends Component {

    static childContextTypes = {
        store: PropTypes.object
    }//getChildContext 指定的传递给子组件的属性需要先通过 childContextTypes 来指定，不然会产生错误。

    getChildContext() {
        return { store }
    }//通过withContext和getChildContext指定的context元素都可以被子组件引用。

    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )

    }
}


ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
