import { useQuery } from "@tanstack/react-query";
import { getCardList, getChartData, getProjects, validateToken } from "./api";

export function useGetProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}

export function useGetCardList() {
  return useQuery({
    queryKey: ["cardlist"],
    queryFn: getCardList,
    retry: false,
  });
}

export function useGetChartData() {
  return useQuery({
    queryKey: ["chardata"],
    queryFn: getChartData,
  });
}

export function useValidateToken() {
  return useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
  });
}
