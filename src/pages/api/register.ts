import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import CONSTANTS from '@/constants/constants';
import { IAuthReturnData } from '@/interface/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAuthReturnData>,
) {
  const body = req.body;
  try {
    const response = await axios.post(
      `${CONSTANTS.BASEURL}/auth/register`,
      body,
    );
    if (response.status === 201 || response.status === 200) {
      const responseAPI = {
        error: false,
        status: response.status,
        data: response.data,
        message: response.statusText,
      };
      res.json(responseAPI);
    }
  } catch (error: any) {
    const responseAPI = {
      error: true,
      status: error.response.status,
      data: null,
      message: error.response.statusText,
    };
    res.json(responseAPI);
  }
}
