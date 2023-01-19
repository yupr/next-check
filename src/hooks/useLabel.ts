import axios from '@/lib/axios';
import { useApi } from '@/hooks/useApi';
import { LabelViewInfo } from '@/types';

const fetchLabelViewInfo = async (): Promise<LabelViewInfo> => {
  const res = await axios.get('/labelViewInfo');
  return res?.data;
};

const useLabelView = () => {
  return useApi(['labelViewInfo'], async () => fetchLabelViewInfo());
};

export { useLabelView };
