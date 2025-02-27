import { Box, Button ,} from "@mui/material"

type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
interface ButtonStyleProps {
    title: string,
    color: ButtonColor,
    variant: 'text' | 'outlined' | 'contained',
    onClick: () => void
}


export const ButtonStyle: React.FC<ButtonStyleProps> = ({title,color,variant,onClick}) => {
    return (
        <>
        <Button color={color} variant={variant} onClick={onClick}
        sx={{textTransform:"none", boxShadow:"none"}}>
            {title}
        </Button>
        </>
    )
}