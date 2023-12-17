import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUserReturn = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: returnsData = [], refetch } = useQuery({
        queryKey: ["user-return-req", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-return-request?email=${user?.email}`)
            // const res = await axios.get(`http://localhost:5000/user-return-request?email=${user?.email}`)
            return res.data;
        }
    })
    return [returnsData, refetch]
};

export default useUserReturn;