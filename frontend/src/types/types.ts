export type vulnerability = {
    id: string;
    asset_hostname: string;
    asset_ip_address: string;
    vulnerability_title: string;
    vulnerability_severity: string;
    vulnerability_cvss: string;
    vulnerability_publication_date: string;
    is_fixed: boolean;
};
