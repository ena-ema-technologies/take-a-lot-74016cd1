import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const UpdateProducts = () => {
    const { id } = useParams();
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    console.log(id);
    const { data: selectedProd = {}, refetch } = useQuery({
        queryKey: ["selectedProd", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {

            const res = await axiosSecure.get(`/update-products-by-seller/${id}`)
            return res.data;

        }
    })

    console.log(selectedProd);
    return (
        <div>

        </div>
    );
};

export default UpdateProducts;