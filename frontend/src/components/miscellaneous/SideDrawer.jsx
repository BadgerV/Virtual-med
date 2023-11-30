import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from '@chakra-ui/react'
import { Button } from "@chakra-ui/button";

const SideDrawer = () => {
  return (
    <div>
      <Box>
        <Tooltip
          label="Search Doctors or Communities"
          hasArrow
          placement="bottom-end"
        >
          <Button variant="ghost">
            <Text d={{base: "none", md:"flex"}}>Search user</Text>
            <span>intersting</span>
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
};

export default SideDrawer;
