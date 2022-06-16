import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./styles.scss";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({
  uploadPercentage,
  handleCloseProgressBar,
}) {
  const [progress, setProgress] = React.useState(2);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (uploadPercentage?.barValue === 0) {
        setProgress((prevProgress) =>
          prevProgress >= 80 ? 80 : prevProgress + 2
        );
      } else if (uploadPercentage?.barValue === 100) {
        setProgress(100);
        setTimeout(() => {
          handleCloseProgressBar(false);
        }, 800);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [uploadPercentage]);

  return (
    <Box sx={{ width: "100%" }} className="progressbar-main-container">
      {uploadPercentage?.barOpenClose && (
        <>
          <LinearProgressWithLabel value={progress} />
          {progress >= 80 ? (
            <p className="loading-refresh">
              Please do not refresh the page, uploading is in progress...
            </p>
          ) : (
            ""
          )}
        </>
      )}
    </Box>
  );
}
