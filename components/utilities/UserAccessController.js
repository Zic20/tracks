
const UserAccessController = (user, obj,columnAccess) => {
    const allowedColumns = columnAccess[user.usertype] || [];
    const filteredObject = {};
    if (allowedColumns.includes("*")) return obj;
    allowedColumns.forEach((element) => {
      if (obj.hasOwnProperty(element)) filteredObject[element] = obj[element];
    });
    return filteredObject;
  };

  export default UserAccessController