import React from 'react';
import "../App.css";
import avatar from "../images/roee-n-avatar.png";

function ProfileCard(user) {
	return (
		<div className="card-container">
			<header>
				<img src={user.user.image} alt={user.user.name} />
			</header>
			<h1 className="bold-text">
				{user.user.name}
			</h1>
			<p className="normal-text">{user.user.age}</p>
			<p className="normal-text">Tel Aviv</p>
			<div className="social-container">
				<div className="followers">
					<h1 className="bold-text">15</h1>
					<h2 className="smaller-text">Followers</h2>
				</div>
				<div className="likes">
					<h1 className="bold-text">27</h1>
					<h2 className="smaller-text">Likes</h2>
				</div>
				<div className="photos">
					<h1 className="bold-text">6</h1>
					<h2 className="smaller-text">Products</h2>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;