export interface tBalanceProp {
    balance: number,
    savings: number,
    setBalance: React.Dispatch<React.SetStateAction<number>>
    setSaving: React.Dispatch<React.SetStateAction<number>>
}
