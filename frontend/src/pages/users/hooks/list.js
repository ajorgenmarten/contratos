import http from "@/configs/http";
import {} from "@/types/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
const filterSchema = z.object({
    search: z.string().optional(),
    page: z.number().optional().default(1),
});
export default function useList() {
    const { register, formState, getValues, setValue, watch } = useForm({
        resolver: zodResolver(filterSchema),
        mode: "all",
        defaultValues: {
            page: 1,
            search: "",
        },
    });
    const [users, setUsers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const filterUsers = useCallback(async () => {
        const params = new URLSearchParams(Object.entries(getValues()).map((entry) => [
            entry[0],
            entry[1].toString(),
        ]));
        const response = await http.get("/v1/users/filter", { params });
        setUsers(response.data.results);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
    }, [getValues]);
    const searchWatched = watch("search");
    const pageWatched = watch("page");
    useEffect(() => {
        const timeout = setTimeout(filterUsers, 250);
        return () => clearTimeout(timeout);
    }, [searchWatched, pageWatched, filterUsers]);
    return {
        register,
        formState,
        users,
        totalItems,
        totalPages,
        getValues,
        setValue,
    };
}
