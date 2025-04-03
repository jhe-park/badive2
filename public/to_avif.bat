@echo off
setlocal enabledelayedexpansion

:: 변환 작업 시작 메시지
echo PNG 파일을 AVIF로 변환 중입니다. 잠시 기다려 주세요...
echo.

:: 현재 디렉토리와 모든 하위 디렉토리의 PNG 파일을 대상으로 순회
for /r %%f in (*.png) do (
  echo "%%f" 파일 변환 중...
  
  :: 현재 파일의 디렉토리 경로와 파일명을 추출
  set "filepath=%%~dpf"
  set "filename=%%~nf"
  
  :: 같은 위치에 AVIF 파일 생성
  ffmpeg -i "%%f" -c:v libaom-av1 -still-picture 1 -crf 30 "!filepath!!filename!.avif" -hide_banner -loglevel error
  
  echo "%%~nxf" 변환 완료 -^> "%%~nf.avif"
  echo.
)

echo 모든 PNG 파일이 AVIF로 변환되었습니다.
pause