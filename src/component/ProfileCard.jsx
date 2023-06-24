import React from 'react';
import "../App.css";

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
			<p className="normal-text">{user.user.location}</p>
			<div className="social-container">
				<div className="photos">
					<h1 className="bold-text">{user.user.product}</h1>
					<h2 className="smaller-text">Products</h2>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;