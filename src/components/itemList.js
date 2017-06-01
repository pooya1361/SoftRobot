import React from 'react';
import api from '../api/softrobot_test_api.min.js';
import Item from './item';
import addIcon from '../img/add.png';

const ItemList = React.createClass({
    styles: {
        date: {
            display: 'flex',
            //minWidth: '120px',
            padding: '0px 8px',
            cursor: 'default',
        },
        text: {
            display: 'block',
            minWidth: '200px',
            width: '50%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            padding: '0px 8px',
            cursor: 'default',
        },
        name: {
            display: 'block',
            minWidth: '70px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            padding: '0px 8px',
            cursor: 'default',
        },

        addIcon: {
            width: '48px',
            cursor: 'pointer',
            display: 'block',
            margin: '16px auto',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: '1',
            flexWrap: 'wrap',
            padding: '4px',
            fontSize: '120%',
        },
        footer: {
            //display: 'flex',
            height: '96px',
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorMessage: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    getInitialState() {
        return ({
            users: [],
            items: [],
            timeout: false,
            addForm: false,
            loading: true,
        })
    },

    componentDidMount() {
        this.getItems();
    },

    getItems() {
        this.setState({
            users: [],
            items: [],
            timeout: false,
            addForm: false,
            loading: true,
        });
        var x = api.XMLHttpRequest();
        x.onreadystatechange = function () {
            console.log(x.readyState, x.status, JSON.parse(x.responseText));
            if (x.status !== 0) {
                this.setState({
                    items: x.responseText
                });
                this.getUsers();
            }
        }.bind(this);
        x.timeout = 3000;
        x.ontimeout = function () {
            console.log('Timeout error for getItems');
            this.setState({
                timeout: true,
            });
            this.getItems();
        }.bind(this);
        x.open("GET", "/getitems", false);
        x.send();
    },

    getUsers() {
        var y = api.XMLHttpRequest();
        y.onreadystatechange = function () {
            console.log(y.readyState, y.status, y.responseText);
            //if (y.status !== 0)  {
            this.setState({
                users: JSON.parse(y.responseText),
                loading: false,
            });
            //}
        }.bind(this);
        y.timeout = 5000;
        y.ontimeout = function () {
            this.getUsers();
            console.log('Timeout error for getUsers');
            this.setState({
                timeout: false,
            });
        }.bind(this);
        y.open("GET", "/getusers", false);
        y.send();
    },

    getName(id) {
        if (this.state.users !== null && this.state.users.length > 0) {
            return this.state.users[id];
        }
    },

    getDate(d) {
        //var d = new Date();
        return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    },

    makeList() {
        let result = [];
        if (this.state.items !== null && this.state.items.length > 0) {
            const items = JSON.parse(this.state.items);
            //console.log(users);
            items.map((data) => {
                result.push(
                    <Item id={data.id}
                        text={data.text}
                        date={data.date}
                        name={data.name}
                        user={this.getName(data.userId)}
                        userId={data.userId}
                        active={data.active}
                        allUsers={this.state.users} 
                        buttonEvent={this.getItems} />
                )
            })
        }
        // this.setState({
        //     loading: false,
        // });
        return result;
    },

    addItemForm() {
        this.setState({ addForm: !this.state.addForm });
    },

    showAddItemForm() {
        if (this.state.addForm) {
            return (
                <Item id="-1"
                    text=""
                    date={this.getDate(new Date())}
                    name=""
                    user=""
                    userId="0"
                    active={false}
                    allUsers={this.state.users}
                    mode="edit"
                    buttonEvent={this.getItems} />
            )
        }
    },

    render() {
        if (this.state.timeout) {
            return (
                <div key='1' style={this.styles.errorMessage} >
                    <span key='1'>Ojdå! något gick fel... :(</span>
                    <img key='2' src="https://t3.ftcdn.net/jpg/01/28/36/52/240_F_128365273_0PhzzfSuq3NJbDbaNqE4yv5hlXEyHBN8.jpg" alt="" />
                    <input key='3' type="button" value="Hämta igen" onClick={this.getItems} />
                </div>
            )
        } else if (!this.state.users || this.state.users.length === 0) {
            return (
                <div key='1' style={this.styles.errorMessage} >
                    <h1>LOADING...</h1>
                    <br />
                    <img src="https://s-media-cache-ak0.pinimg.com/originals/cb/05/42/cb05420fec7a12bb752da11df0fb553f.gif" alt="" />
                </div>
            );
        } else {
            return (
                <div key='1' style={this.styles.menuItem} >
                    <div key='100' style={this.styles.header}>
                        <span style={this.styles.text} >Text</span>
                        <span style={this.styles.date} >Datum</span>
                        <span style={this.styles.name} >Ägare</span>
                        <span style={this.styles.name} >Aktiv</span>
                        <span style={{
                            width: '3%', cursor: 'default',
                        }} ></span>
                    </div>
                    <div ref={(list) => { this.itemList = list; }} >
                        {this.makeList()}
                    </div>

                    <div key='1000' style={this.styles.footer}>
                        {this.showAddItemForm()}
                        <img style={this.styles.addIcon} src={this.state.addForm ? "https://images.onlinelabels.com/images/clip-art/molumen/molumen_red_round_error_warning_icon.png" : addIcon} onClick={this.addItemForm} />
                    </div>
                </div>
            );
        }
    }
})

export default ItemList;