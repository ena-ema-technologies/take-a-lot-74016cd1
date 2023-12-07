import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useOrders = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: allOrders = {}, refetch } = useQuery({
        queryKey: ["allOrders", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {

            const res = await axiosSecure.get(`/all-orders-by-user/confirmation?email=${user?.email}`)
            return res.data;

        }
    })
    return [allOrders, refetch]
};

export default useOrders;