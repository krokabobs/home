'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {

    }

    render() {

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Мне нравится'
        );
    }
}
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);