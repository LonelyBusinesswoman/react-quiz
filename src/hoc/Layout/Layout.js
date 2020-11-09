import React, {Component} from 'react'
import classes from './Layout.module.scss'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'


class Layout extends Component{
    state = {
        menu: false,
    }
    toggleNemuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler = () =>{
        this.setState({
            menu: false
        })
    }
    render() {
        return(
            <div className={classes.Layout}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                >

                </Drawer>
                <MenuToggle
                    onToggle={this.toggleNemuHandler}
                    isOpen={this.state.menu}
                >

                </MenuToggle>
                <main className={classes['main']}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Layout