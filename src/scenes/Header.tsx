import {ColorModeSwitcher} from "../components/ColorModeSwitcher";
import {Box, GridItem, useColorModeValue} from "@chakra-ui/react";
import * as React from "react";

export const Header = () => {
    const backGroundColor = useColorModeValue("gray.100", "gray.700");

    return <Box
        display='flex'
        justifyContent='flex-end'
        alignItems='center'
        // bg={backGroundColor}
        borderColor='inherit'
        pr='4px'
        h='6vh'
        minH="6vh"
        className="header"
    >
        <ColorModeSwitcher />
    </Box>
}