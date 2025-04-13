const MyProfile = async ({
   params,
}: {
   params: Promise<{ username: string }>;
}) => {
   const { username } = await params;
   return <div>{username}</div>;
};

export default MyProfile;
