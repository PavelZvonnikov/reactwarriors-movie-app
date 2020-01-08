import React from "react";

export const User = ({ user }) => {
  return (
    <div className="user-wrapper">
      <img
        src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
      />
    </div>
  );
};
