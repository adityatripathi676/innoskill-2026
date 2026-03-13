
START_TIME=$(date +%s)
echo "compiling"
go build -o api .
EXIT_CODE=$?
echo "Build complete."
END_TIME=$(date +%s)
ELAPSED_TIME=$((END_TIME - START_TIME))
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Color
if [ $EXIT_CODE -eq 0 ]; then
    echo "${GREEN}✔ Compiled in ${ELAPSED_TIME} seconds${NC}"
else
    echo "${RED}✘ Compilation failed with exit code ${EXIT_CODE} in ${ELAPSED_TIME} seconds${NC}"
fi
exit $EXIT_CODE
