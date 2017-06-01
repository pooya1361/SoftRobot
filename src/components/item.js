import React from 'react';
import api from '../api/softrobot_test_api.min.js';

const Item = React.createClass({
    getInitialState() {
        return ({
            expand: false,
            mode: this.props.mode === '' ? 'display' : this.props.mode,
            user: this.props.user,
            userId: this.props.userId,
            date: this.props.date,
            text: this.props.text,
            active: this.props.active,
            loading: false,
        })
    },

    expandCollapse() {
        this.setState({
            expand: !this.state.expand,
        })
    },

    editMode() {
        this.setState({
            mode: 'edit',
            user: this.state.user,
            userId: this.state.userId,
            date: this.state.date,
            text: this.state.text,
            active: this.state.active,
        })
    },

    componentDidMount() {
        this.setState({
            mode: this.props.mode === '' ? 'display' : this.props.mode,
            id: this.props.id,
            user: this.props.user,
            userId: this.props.userId,
            date: this.props.date,
            text: this.props.text,
            active: this.props.active,
        })
    },

    handleOwnerChange(event) {
        this.setState({
            userId: event.target.value,
            user: this.props.allUsers[event.target.value],
        });
    },

    handleDateChange(event) {
        this.setState({ date: event.target.value });
    },

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    },

    handleActiveChange(status) {
        this.setState({ active: !this.state.active });
    },

    getAllUsersList() {
        let result = [];
        const users = this.props.allUsers;
        //console.log(this.state);
        result.push(
            users.map((data, index) => {
                result.push(
                    <option value={index}>{data}</option>
                )
            })
        );
        //console.log(result);
        return (
            <select style={{ fontSize: '20px' }} value={this.state.userId} onChange={this.handleOwnerChange}>
                {result}
            </select>
        )
    },

    validateDate(d) {
        const IsoDateRe = new RegExp("^([0-9]{4})-([0-9]{2})-([0-9]{2})$");
        var matches = IsoDateRe.exec(d);
        if (!matches) return false;

        var composedDate = new Date(matches[1], (matches[2] - 1), matches[3]);

        return ((composedDate.getMonth() == (matches[2] - 1)) &&
            (composedDate.getDate() == matches[3]) &&
            (composedDate.getFullYear() == matches[1]));
    },

    validateForm() {
        if (!this.validateDate((this.state.date).substring(0, 10))) {
            alert(this.state.date + " is not a valid date.");
            return false;
        }

        if (this.state.text.length === 0) {
            alert("Please enter text");
            return false;
        }

        return true;
    },

    saveChange() {
        if (this.state.loading || !this.validateForm()) return;
        this.setState({
            loading: true,
        });
        const item = {
            active: this.state.active,
            date: this.state.date,
            id: this.state.id,
            text: this.state.text,
            userId: this.state.userId,
        };
        console.log(
            //JSON.stringify(item)
        );
        var xhr = api.XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log(xhr.readyState, xhr.status, xhr.responseText);
            if (xhr.status === 200) {
                this.setState({
                    mode: 'display',
                    loading: false,
                });
                alert('Item saved!');
                this.props.buttonEvent();
            }
        }.bind(this);
        xhr.timeout = 9000;
        xhr.ontimeout = function () {
            console.log('Timeout error for save item');
            this.setState({
                timeout: true,
                loading: false,
            });
            this.saveChange();
            //alert('Timeout! Try again');
        }.bind(this);
        xhr.open("PUT", "/putitem", false);
        xhr.send(this.state.mode === "edit" ? JSON.stringify(item) : null);

    },

    render() {
        const styles = {
            row: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: '1',
                flexWrap: 'wrap',
                border: '1px solid',
                padding: '4px',
                marginTop: '-0.5px',
                transition: 'all 0.3s ease-in-out',
            },
            date: {
                display: 'flex',
                //minWidth: '120px',
                padding: '0px 8px',
                cursor: this.state.mode === "edit" || this.state.mode === "add" ? 'text' : 'default',
                width: '105px',
                fontSize: '20px',
            },
            text: {
                display: 'block',
                minWidth: '200px',
                width: '50%',
                overflow: 'hidden',
                whiteSpace: this.state.expand || this.state.mode === "edit" || this.state.mode === "add" ? '' : 'nowrap',
                textOverflow: 'ellipsis',
                padding: '0px 8px',
                cursor: this.state.mode === "edit" ? 'text' : 'pointer',
                transition: 'all 0.3s ease-in-out',
                fontSize: '20px',
            },
            name: {
                display: 'block',
                width: '70px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                padding: '0px 8px',
                cursor: this.state.mode === "edit" || this.state.mode === "add" ? 'text' : 'default',
                fontSize: '20px',
            },

            stage: {
                width: '36px',
                height: '36px',
                margin: '4px 12px',
                perspective: '100px',
                perspectiveOrigin: '50% 50%',
                display: 'inline-block',
                cursor: this.state.mode === "edit" || this.state.mode === "add" ? 'pointer' : 'default',
            },
            active: {
                width: '36px',
                display: 'inline-block',
                height: '36px',
                textAlign: 'center',
                lineHeight: '36px',
                borderRadius: '50%',
                margin: '0 4px',
                backgroundColor: '#6f7985',
                fontWeight: 'bold',
                color: 'white',
                background: 'radial-gradient(circle at 36px 36px, #228f26, #72ee5b)',
            },
            deactive: {
                width: '36px',
                display: 'inline-block',
                height: '36px',
                textAlign: 'center',
                lineHeight: '36px',
                borderRadius: '50%',
                margin: '0 4px',
                backgroundColor: '#6f7985',
                fontWeight: 'bold',
                color: 'white',
                background: 'radial-gradient(circle at 36px 36px, #8b2020, #f61212)',
            },
            editIcon: {
                width: this.state.mode === "edit" || this.state.mode === "add" ? '36px' : '24px',
                margin: this.state.mode === "edit" || this.state.mode === "add" ? '4px 7px' : '4px 12px',
                cursor: 'pointer',
            },
        };

        if (!this.props.allUsers) return (<span />) ;
        
        if (this.state.mode === "edit" || this.state.mode === "add") {
            return (
                <div key={this.props.id} style={styles.row}>
                    <textarea rows="4" style={styles.text} onClick={this.expandCollapse} value={this.state.text} onChange={this.handleTextChange} />
                    <input type="text" style={styles.date} value={(this.state.date).substring(0, 10)} onChange={this.handleDateChange} />
                    {this.getAllUsersList()}
                    <section style={styles.stage} onClick={this.handleActiveChange} >
                        <figure style={this.state.active ? styles.active : styles.deactive} />
                    </section>
                    <img style={styles.editIcon} src={this.state.loading ?
                        'https://68.media.tumblr.com/695ce9a82c8974ccbbfc7cad40020c62/tumblr_o9c9rnRZNY1qbmm1co1_500.gif' :
                        'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/floppy-512.png'} onClick={this.saveChange} />
                </div>
            );
        } else {
            return (
                <div key={this.state.id} ref={"item" + this.state.id} style={styles.row}>
                    <span title={this.state.text} style={styles.text} onClick={this.expandCollapse} > {this.state.text} </span>
                    <span title={this.state.date} style={styles.date} > {(this.state.date).substring(0, 10)} </span>
                    <span title={this.state.userId} style={styles.name} > {this.props.allUsers[this.state.userId]} </span>
                    <section style={styles.stage}>
                        <figure style={this.state.active ? styles.active : styles.deactive} />
                    </section>
                    <img style={styles.editIcon} src='https://image.flaticon.com/icons/png/512/61/61456.png' onClick={this.editMode} />
                </div>
            );
        }
    }
})

export default Item;
