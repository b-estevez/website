import React from 'react';
import { useZestyStore } from 'store';
import { YourProfile } from 'views/accounts/profile/YourProfile';
import { ProfileContainer } from 'components/accounts';

export { default as getServerSideProps } from 'lib/protectedRouteGetServerSideProps';

export default function ProfilePage() {
  const { setuserInfo } = useZestyStore((state) => state);
  const { ZestyAPI } = useZestyStore((state) => state);
  const [userZUID, setuserZUID] = React.useState('');

  const handleVerifySuccess = (res) => {
    setuserZUID(res.meta.userZuid);
  };

  const handleVerifyError = (res) => {
    console.log(res, 'err');
  };

  const handleGetUserSuccess = (res) => {
    setuserInfo(res?.data);
  };

  const handleGetUserError = (res) => {
    console.log(res, 'err');
  };

  const verify = async () => {
    const res = await ZestyAPI.verify();
    !res.error && handleVerifySuccess(res);
    res.error && handleVerifyError(res);
  };

  const getUser = async (userZUID) => {
    const res = await ZestyAPI.getUser(userZUID);
    !res.error && handleGetUserSuccess(res);
    res.error && handleGetUserError(res);
  };

  React.useEffect(() => {
    verify();
  }, []);

  React.useEffect(() => {
    userZUID && getUser(userZUID);
  }, [userZUID]);

  return (
    <ProfileContainer>
      <YourProfile getUser={() => getUser(userZUID)} />
    </ProfileContainer>
  );
}
