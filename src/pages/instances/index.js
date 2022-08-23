import React from 'react';
import { useZestyStore } from 'store';
import { InstancesDashboard } from 'components/accounts/instances/InstancesDashboard';
import { useFetchWrapper } from 'components/hooks/useFetchWrapper';

export default function Instances() {
  const { instances } = useFetchWrapper();
  const { setInstances } = useZestyStore((state) => state);

  React.useEffect(() => {
    setInstances(instances);
  }, [instances]);

  return <InstancesDashboard />;
}

Instances.data = {
  container: 'InstanceContainer',
  props: {
    isDashboard: true,
  },
};
