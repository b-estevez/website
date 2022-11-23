import { getCookie } from 'cookies-next';
import { fetchWrapperOptions, getUserAppSID } from 'utils';
import create from 'zustand';

const getInstanceZUID = () => {
  if (typeof window !== 'undefined') {
    return window?.location?.pathname?.split('/')[2];
  }
};
const instanceZUID = getCookie('ZESTY_WORKING_INSTANCE') || getInstanceZUID();
const userAppSID = getUserAppSID();

export const getZestyAPI = (id) => {
  if (typeof window !== 'undefined') {
    return new Zesty.FetchWrapper(
      id || instanceZUID,
      userAppSID,
      fetchWrapperOptions(),
    );
  }
};
export const useZestyStore = create((set) => {
  return {
    instanceZUID,
    userAppSID,
    ZestyAPI: getZestyAPI(),
    setZestyAPI: (data) => set(() => ({ ZestyAPI: data })),
    isAuthenticated: false,
    setisAuthenticated: (data) => set(() => ({ isAuthenticated: data })),
    isUser: false,
    setisUser: (data) => set(() => ({ isUser: data })),
    workingInstance: instanceZUID,
    setworkingInstance: (data) => set(() => ({ workingInstance: data })),
    verifySuccess: {},
    setverifySuccess: (data) => set(() => ({ verifySuccess: data })),
    instances: {},
    setInstances: (data) => set(() => ({ instances: data })),
    instance: {},
    setInstance: (data) => set(() => ({ instance: data })),
    loading: false,
    setloading: (data) => set(() => ({ loading: data })),
    userInfo: {},
    setuserInfo: (data) => set(() => ({ userInfo: data })),

    // new user data
    role: '',
    setrole: (data) => set(() => ({ role: data })),
    project: '',
    setproject: (data) => set(() => ({ project: data })),
    projectName: '',
    setprojectName: (data) => set(() => ({ projectName: data })),
    emails: [],
    setemails: (data) => set(() => ({ emails: data })),
    template: '',
    settemplate: (data) => set(() => ({ template: data })),
  };
});
