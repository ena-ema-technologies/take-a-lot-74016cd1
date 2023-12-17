import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: allOrders = [], refetch } = useQuery({
        queryKey: ["all-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-buyer-orders");
            return res.data;
        },
    });
    return [allOrders, refetch];
};

export default useOrders;
