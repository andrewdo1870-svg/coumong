import { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const TARGET_URL = "https://coumong.com";
const INTRO_DURATION = 2000; // 2초 인트로
const FADE_DURATION = 500; // 0.5초 페이드 아웃

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [webViewReady, setWebViewReady] = useState(false);

  const introOpacity = useSharedValue(1);

  const introAnimatedStyle = useAnimatedStyle(() => ({
    opacity: introOpacity.value,
  }));

  // 인트로 타이머: 최소 INTRO_DURATION 후 웹뷰가 준비되면 페이드 아웃
  useEffect(() => {
    const timer = setTimeout(() => {
      setWebViewReady(true);
    }, INTRO_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (webViewReady) {
      introOpacity.value = withTiming(0, {
        duration: FADE_DURATION,
        easing: Easing.out(Easing.ease),
      });
      const hideTimer = setTimeout(() => {
        setShowIntro(false);
      }, FADE_DURATION);
      return () => clearTimeout(hideTimer);
    }
  }, [webViewReady]);

  // Android 하드웨어 뒤로 가기 버튼 처리
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== "android") return;

      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [canGoBack])
  );

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    webViewRef.current?.reload();
  };

  if (hasError && !showIntro) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>연결할 수 없습니다</Text>
          <Text style={styles.errorMessage}>
            네트워크 연결을 확인하고 다시 시도해 주세요.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style={showIntro ? "light" : "dark"} />

      {/* 웹뷰 (인트로 뒤에서 미리 로드) */}
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <WebView
          ref={webViewRef}
          source={{ uri: TARGET_URL }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            if (nativeEvent.statusCode >= 500) {
              setHasError(true);
            }
          }}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          allowsBackForwardNavigationGestures={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pullToRefreshEnabled={true}
        />
        {/* 웹뷰 로딩 인디케이터 (인트로가 끝난 후에만 표시) */}
        {isLoading && !showIntro && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#E8456B" />
          </View>
        )}
      </SafeAreaView>

      {/* 인트로 오버레이 */}
      {showIntro && (
        <Animated.View style={[styles.introOverlay, introAnimatedStyle]}>
          <Image
            source={require("@/assets/images/intro.png")}
            style={styles.introImage}
            resizeMode="cover"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#FFFFFF",
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#E8456B",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  introOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  introImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
