import React from 'react';
import Icon from 'assets/img/avatar.jpeg';
import './card.scss'
import { NavLink } from 'react-router-dom';

const Card = (props: any) => {
    const { title } = props.data;

    return (
        <NavLink to={`/${props.data.id}`} activeClassName="selected">
            <div className="card m-2" >
                <div className="card-content">
                    <div className="content columns is-mobile">
                        <div className="column is-one-fifth">
                            <div className="img-wrapper image is-48x48">
                                <img className="is-rounded" src={Icon} alt="avatar icon" />
                            </div>
                        </div>
                        <div className="content-wrapper column is-four-fifths">
                            <div className="is-size-6 has-text-weight-bold">
                                {title.rendered}
                            </div>
                            <div className="blog-text is-size-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae reprehenderit nam aperiam voluptatibus sit consectetur magnam, repudiandae, consequuntur quod exercitationem libero, accusamus incidunt nobis adipisci ad nisi eum. Numquam, in?
                            </div>
                            <div className="time is-size-7 mt-1">
                                Yesterday, 9:10 AM
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink >

    )
}

export default Card;